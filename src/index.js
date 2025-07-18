const core = require('@actions/core');

async function run() {
  try {
    const chartDataInput = core.getInput('chart-data', { required: true });
    const chartData = JSON.parse(chartDataInput);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Chart Report</title>
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </head>
        <body>
          <h1>Chart Report</h1>
          <canvas id="myChart" width="800" height="600"></canvas>
          <script>
            const ctx = document.getElementById('myChart').getContext('2d');
            new Chart(ctx, {
              type: 'bar',
              data: ${JSON.stringify(chartData)},
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });
          </script>
        </body>
      </html>
    `;

    core.setOutput('html-report', htmlContent);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
