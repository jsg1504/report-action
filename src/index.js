const core = require('@actions/core');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');

async function run() {
  try {
    const chartDataInput = core.getInput('chart-data', { required: true });
    const chartData = JSON.parse(chartDataInput);

    const width = 800;
    const height = 600;
    const configuration = {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      plugins: [{
        id: 'background-colour',
        beforeDraw: (chart) => {
          const ctx = chart.ctx;
          ctx.save();
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }
      }]
    };

    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour: 'white' });
    const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    const imageBase64 = imageBuffer.toString('base64');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Chart Report</title>
        </head>
        <body>
          <h1>Chart Report</h1>
          <img src="data:image/png;base64,${imageBase64}" alt="Chart">
        </body>
      </html>
    `;

    core.setOutput('html-report', htmlContent);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
