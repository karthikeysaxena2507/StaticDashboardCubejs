/* eslint-disable no-loop-func */
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { Chart, Axis, Tooltip, Geom, } from 'bizcharts';
import { CSVLink } from "react-csv";

const Area = (props) => {

  var [count, setCount] = useState(0);

  var [csvData, setCsvData] = useState([]);

  var dataSource = [];

  var columns = [];

  var [headers, setHeaders] = useState([]);

    const stackedChartData = (resultSet) => {
      const data = resultSet
        .pivot()
        .map(({ xValues, yValuesArray }) =>
          yValuesArray.map(([yValues, m]) => ({
            x: resultSet.axisValuesString(xValues, ', '),
            color: resultSet.axisValuesString(yValues, ', '),
            measure: m && Number.parseFloat(m),
          }))
        )
        .reduce((a, b) => a.concat(b), []);
      return data;
    };


    const cubejsApi = cubejs(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDkyNTcwMDksImV4cCI6MTYwOTM0MzQwOX0.4jxWCg7Ka72YLFTAH2NQ0aHg2JV1zCdepj7G30y-w9s',
      { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
    );

    const renderChart = ({ resultSet, error, pivotConfig }) => {
      if (error) {
        return <div>{error.toString()}</div>;
      }

      if (!resultSet) {
        return <Spin />;
      }

      dataSource = resultSet.tablePivot();
      columns = resultSet.tableColumns();
      setCount(dataSource.length);

      return (
      <Chart
        scale={{
          x: {
            tickCount: 8,
          },
        }}
        height={400}
        data={stackedChartData(resultSet)}
        forceFit
      >
        <Axis name="x" />
        <Axis name="measure" />
        <Tooltip
          crosshairs={{
            type: 'y',
          }}
        />
        <Geom type="area" position="x*measure" size={2} color="color" />
      </Chart>
    );

    };

    function set() {
      setCsvData(dataSource);
      setHeaders(columns);
      var temp = [];
      columns.forEach((column) => {
        temp.push({label: column.shortTitle, key: column.key});
      })
      setHeaders(temp);
      alert("chart data updated, you may now download it");
    }

    const ChartRenderer = () => {
      return (<div>
      <p> First update and then download </p>
        <button onClick={set} className="box expand right"> Update Charts Table </button>
        <span className="top left">
          <button className="box expand"> 
            <CSVLink 
              data={csvData} 
              filename={"Chart-DataTable.csv"} 
              headers={headers}
              className="download"
            >
              Download Chart Table
            </CSVLink> 
          </button>
        </span>
        <h3 className="top"> No. of Items: {count} </h3>
        <h2 className="top"> Area Chart </h2>
        <QueryRenderer
          query={{
      "dimensions": props.dimensions,
      "timeDimensions": [],
      "order": {},
      "measures": props.measures,
      "filters": props.filters
    }}
          cubejsApi={cubejsApi}
          resetResultSetOnChange={false}
          render={(props) => renderChart({
            ...props,
            pivotConfig: {
      "x": [
        props.dimensions
      ],
      "y": [
        props.measures
      ],
      "fillMissingDates": true,
      "joinDateRange": false
    }
          })}
        />
        </div>
      );
    };
  return <ChartRenderer />
}

export default Area;      