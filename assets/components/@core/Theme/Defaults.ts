export default {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    info: '#17a2b8',
    warning: '#ffc107',
    danger: '#dc3545',
    light: '#f8f9fa',
    dark: '#343a40'
  },
  modifiers: {
    alert: {
      backgroundColor: -10,
      borderColor: -9,
      color: 6
    },
    
  },
  themeInterval: 0.08
}

// #004085

// $alert-bg-level:                    -10 !default;
// $alert-border-level:                -9 !default;
// $alert-color-level:                 6 !default;
// $theme-color-interval:      8% !default;

// @each $color, $value in $theme-colors {
//   .alert-#{$color} {
//     @include alert-variant(theme-color-level($color, $alert-bg-level), theme-color-level($color, $alert-border-level), theme-color-level($color, $alert-color-level));
//   }
// }

// // Request a theme color level
// @function theme-color-level($color-name: "primary", $level: 0) {
//   $color: theme-color($color-name);
//   $color-base: if($level > 0, $black, $white);
//   $level: abs($level);

//   @return mix($color-base, $color, $level * $theme-color-interval);
// }

// @mixin alert-variant($background, $border, $color) {
//   color: $color;
//   @include gradient-bg($background);
//   border-color: $border;

//   hr {
//     border-top-color: darken($border, 5%);
//   }

//   .alert-link {
//     color: darken($color, 10%);
//   }
// }