const Text = ({ 
  children, 
  variant = 'body', 
  size = 'base',
  weight = 'normal',
  color = 'white',
  className = '',
  neon = false,
  ...props 
}) => {
  const variants = {
    display: 'font-display',
    body: 'font-body',
    mono: 'font-mono'
  };

  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm', 
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl'
  };

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black'
  };

  const colors = {
    white: 'text-white',
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    info: 'text-info',
    gray: 'text-gray-400'
  };

  return (
    <span 
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        ${weights[weight]} 
        ${colors[color]}
        ${neon ? 'neon-text' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

export default Text;