# My Custom Action

This is a custom GitHub Action created for demonstration purposes.

## Usage

To use this action in your workflow, you can add the following step:

```yaml
- name: Run My Custom Action
  uses: your-username/report-action@v1
  with:
    greeting: 'World'
```

## Inputs

- `greeting`: (Required) A friendly greeting. Default is `'Hello'`.

## Outputs

- `time`: The time the action was run.
