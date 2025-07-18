const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const fs = require('fs');

async function run() {
  try {
    const chartDataInput = core.getInput('chart-data', { required: true });
    const githubToken = core.getInput('github-token', { required: true });
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

    // Push to gh-pages
    const remoteRepo = `https://x-access-token:${githubToken}@github.com/jsg1504/report-action.git`;
    
    fs.writeFileSync('index.html', htmlContent);

    await exec.exec('git', ['config', '--global', 'user.name', 'github-actions[bot]']);
    await exec.exec('git', ['config', '--global', 'user.email', 'github-actions[bot]@users.noreply.github.com']);
    await exec.exec('git', ['init']);
    await exec.exec('git', ['add', 'index.html']);
    await exec.exec('git', ['commit', '-m', 'Deploy to GitHub Pages']);
    await exec.exec('git', ['push', '--force', remoteRepo, 'master:gh-pages']);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
