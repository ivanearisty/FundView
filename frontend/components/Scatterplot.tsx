// https://observablehq.com/d/c49c7ddf2bbccf8d

"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import useWindowDimensions from "@/hooks/useWindowDimensions";

type DataPoint = {x: number, y: number, name: string, quarter: string};

function Scatterplot(props: {
    data: DataPoint[],
    width: number, height: number, left_legend: string, down_legend: string, quarter?: string
}) {
    const ref = useRef(null);
    const { width: windowWidth } = useWindowDimensions();

    useEffect(() => {
        // defining width and height
        const w = props.width * windowWidth;
        const h = props.height;
        const data = props.data.filter(d => !props.quarter || d.quarter == props.quarter);

        // Margin object with four properties
        const margin = { top: 40, right: 20, bottom: 50, left: 50 };

        // create innerWidth and innerHeight for our margin
        const innerW = w - margin.right - margin.left;
        const innerH = h - margin.top - margin.bottom;

        // append a g element to our svg and give it a new origin inside svg
        const g = d3.select(ref.current)
            .append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // create group elements for our axes
        const xAxisG = g.append('g')
            .attr('transform', "translate(0," + innerH + ")");
        const yAxisG = g.append('g');

        // create functions that get sepal and petal values
        const xValue = (d: DataPoint) => d.x;
        const yValue = (d: DataPoint) => d.y;

        // define a couple of linear scales
        const xScale = d3.scaleLinear();
        const yScale = d3.scaleLinear();

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        // set scales domain and range
        xScale
            .domain(d3.extent(data, xValue) as number[])
            .range([0, innerW]);
        yScale
            .domain(d3.extent(data, yValue) as number[])
            .range([innerH, 0]);

        // append circles to our g element and attach the iris dataset to them
        const circles = g
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle');

        // provide attributes to our circles
        circles
            .attr('cx', d => xScale(xValue(d)))
            .attr('cy', d => yScale(yValue(d)))
            .attr('r', 5)
            .attr('fill', 'steelblue')
            .attr('opacity', 0.9);

        // Create a tooltip div
        const tooltip = d3.select("body")
            .append("div")
            .style('position', 'absolute')
            .style('background-color', 'white')
            .style('border', '1px solid black')
            .style('padding', '5px')
            .style('display', 'none');

        // Add tooltip behavior
        circles
            .on('mouseover', function(event, d) {
            tooltip
                .style('display', 'block')
                .html(`${d.name}<br>${props.left_legend}: ${d.y}<br>${props.down_legend}: ${d.x}`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 10) + 'px');
            })
            .on('mousemove', function(event) {
            tooltip
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 10) + 'px');
            })
            .on('mouseout', function() {
            tooltip.style('display', 'none');
            });

        // Call axes
        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

        // Add axis labels
        g.append('text')
            .attr('x', innerW / 2)
            .attr('y', innerH + 40)
            .attr('text-anchor', 'middle')
            .text(props.down_legend);

        g.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerH / 2)
            .attr('y', -40)
            .attr('text-anchor', 'middle')
            .text(props.left_legend);
    });
};

export default Scatterplot;