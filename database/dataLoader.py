import os
import pymysql
from dotenv import load_dotenv
from multiprocessing import Pool, cpu_count

# Load environment variables from .env file
load_dotenv()

# MySQL connection configuration
connection_config = {
    "host": os.getenv("DB_HOST", "127.0.0.1"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "root"),
    "database": os.getenv("DB_NAME", "ThirteenF"),
    "port": int(os.getenv("DB_PORT", 3306)),
    "local_infile": True
}

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Initialize database schema
def initialize_db():
    schema_path = os.path.join(BASE_DIR, '13F_DB_init.sql')
    connection = pymysql.connect(**connection_config)
    with connection.cursor() as cursor:
        with open(schema_path, 'r') as f:
            schema_sql = f.read()
            for statement in schema_sql.split(';'):
                statement = statement.strip()
                if statement:
                    cursor.execute(statement)
    connection.commit()
    connection.close()
    print("Database initialized successfully.")

# Paths to directories
SUBMISSION_DIR = os.path.join(BASE_DIR, 'EdgarDataSource/SUBMISSION')
COVERPAGE_DIR = os.path.join(BASE_DIR, 'EdgarDataSource/COVERPAGE')
INFOTABLE_DIR = os.path.join(BASE_DIR, 'EdgarDataSource/INFOTABLE')

# Function to load a single file into MySQL
def load_file(args):
    file_path, table_name, columns, date_columns = args
    print(f"Loading {file_path} into {table_name}...")
    connection = pymysql.connect(**connection_config)
    if date_columns:
        set_clause = ", ".join([f"{col} = STR_TO_DATE(@{col}, '%d-%b-%Y')" for col in date_columns])
        query = f"""
            LOAD DATA LOCAL INFILE '{file_path}'
            INTO TABLE {table_name}
            FIELDS TERMINATED BY '\\t'
            LINES TERMINATED BY '\\n'
            IGNORE 1 LINES
            ({','.join(columns)})
            SET {set_clause};
        """
    else:
        query = f"""
            LOAD DATA LOCAL INFILE '{file_path}'
            INTO TABLE {table_name}
            FIELDS TERMINATED BY '\\t'
            LINES TERMINATED BY '\\n'
            IGNORE 1 LINES
            ({','.join(columns)});
        """
    with connection.cursor() as cursor:
        cursor.execute(query)
    connection.commit()
    connection.close()

if __name__ == "__main__":
    # Initialize the database schema
    initialize_db()

    # Prepare tasks for multiprocessing
    tasks = []

    # Add SUBMISSION files to tasks
    for file in os.listdir(SUBMISSION_DIR):
        if file.endswith('.tsv'):
            file_path = os.path.join(SUBMISSION_DIR, file)
            tasks.append((file_path, 'SUBMISSION', ['ACCESSION_NUMBER', '@FILING_DATE', 'SUBMISSIONTYPE', 'CIK', '@PERIODOFREPORT'], ['FILING_DATE', 'PERIODOFREPORT']))

    # Add COVERPAGE files to tasks
    for file in os.listdir(COVERPAGE_DIR):
        if file.endswith('.tsv'):
            file_path = os.path.join(COVERPAGE_DIR, file)
            tasks.append((file_path, 'COVERPAGE', ['ACCESSION_NUMBER', '@REPORTCALENDARORQUARTER', 'ISAMENDMENT', 'FILINGMANAGER_NAME'], ['REPORTCALENDARORQUARTER']))

    # Add INFOTABLE files to tasks
    for file in os.listdir(INFOTABLE_DIR):
        if file.endswith('.tsv'):
            file_path = os.path.join(INFOTABLE_DIR, file)
            tasks.append((file_path, 'INFOTABLE', ['ACCESSION_NUMBER', 'INFOTABLE_SK', 'NAMEOFISSUER', 'TITLEOFCLASS', 'CUSIP', 'VAL'], []))

    # Use multiprocessing to load files concurrently
    with Pool(cpu_count()) as pool:
        pool.map(load_file, tasks)

    print("All files loaded successfully!")
