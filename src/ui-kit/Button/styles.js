export const getButtonStyles = (theme, variant) => {
  const defaultStyle = {
    backgroundColor: theme.palette.white.main,
    color: theme.palette.black.main,
    border: `1px solid ${theme.palette.grey.main}`,
    fontSize: theme.typography.button.fontSize,
  };

  const primaryStyle = {
    backgroundColor: theme.palette.blue.secondary,
    color: theme.palette.white.main,
    fontSize: theme.typography.button.fontSize,
  };

  const secondaryVariantStyle = {
    backgroundColor: theme.palette.white.main,
    border: `1px solid ${theme.palette.grey.main}`,
    color: theme.palette.blue.secondary,
    fontSize: theme.typography.button.fontSize,
  };

  const warningVariantStyle = {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.white.main,
    fontSize: theme.typography.button.fontSize,
  };

  switch (variant) {
    case "primary": {
      return primaryStyle;
    }
    case "secondary": {
      return secondaryVariantStyle;
    }
    case "warning": {
      return warningVariantStyle;
    }
    default: {
      return defaultStyle;
    }
  }
};
