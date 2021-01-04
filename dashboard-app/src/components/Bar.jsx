import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';

const Bar = (props) => {

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
        <Tooltip />
        <Geom type="interval" position="x*measure" color="color" />
      </Chart>
    );

    };

    const ChartRenderer = () => {
      return (<div>
      <h2 className="top"> Bar Chart </h2>
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

export default Bar;


      