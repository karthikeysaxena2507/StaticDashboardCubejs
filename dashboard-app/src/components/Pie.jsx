import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { Chart, Axis, Tooltip, Geom, Coord, Legend } from 'bizcharts';
// import { Row, Col, Statistic, Table } from 'antd';

const Pie = (props) => {

  var [count, setCount] = useState(0);

  //   function stackedChartData(resultSet) {
  //   const data = resultSet
  //     .pivot()
  //     .map(({ xValues, yValuesArray }) => yValuesArray.map(([yValues, m]) => ({
  //       x: resultSet.axisValuesString(xValues, ', '),
  //       color: resultSet.axisValuesString(yValues, ', '),
  //       measure: m && Number.parseFloat(m),
  //     }))
  //     )
  //     .reduce((a, b) => a.concat(b), []);
  //   return data;
  // }


    const cubejsApi = cubejs(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDkyNTcxMTksImV4cCI6MTYwOTM0MzUxOX0.SQ9zQR7GvQbJ_T0rfr_Ok2HY6z5Ybo8ao6aOJ57zzbs',
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

      return (
      <Chart height={400} data={resultSet.chartPivot()} forceFit>
        <Coord type="theta" radius={0.75} />
        {resultSet.seriesNames().map((s) => (
          <Axis name={s.key} />
        ))}
        <Legend position="right" />
        <Tooltip />
        {resultSet.seriesNames().map((s) => (
          <Geom type="interval" position={s.key} color="category" />
        ))}
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

export default Pie;
      