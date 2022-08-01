# Powerreviews Salesforce Commerce Cloud Build

## Requirements

All assets in the `powerreviews` directly must deployed to `/client/default/powerreviews/`.

## Usage

- The integration is similar to the existing the only difference being the filename and its location:

```html
<body>
  <!-- page content -->
  <script>
    windows.powerreviewsBasePath = '/static/default/js/powerreviews';
  </script>
  <script src="/static/default/js/powerreviews/js/loader.js">
    <script>
      POWERREVIEWS.display.render({
        // config goes here
      })
  </script>
</body>
```
