import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { Chart, Axis, Tooltip, Geom, } from 'bizcharts';
// import { Row, Col, Statistic, Table } from 'antd';
// import { Coord, Legend } from "bizcharts";

const Area = (props) => {

  var [count, setCount] = useState(0);

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
      // console.log(data);
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

      const dataSource = resultSet.tablePivot();
      setCount(dataSource.length);
      // const columns = resultSet.tableColumns();
      // console.log(dataSource);
      // console.log(columns);
      // console.log(resultSet.getString("backwardCompatibleData"));
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

    const ChartRenderer = () => {
      return (<div>
        <h3> No. of Items: {count} </h3>
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