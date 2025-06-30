import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "font-display font-bold transition-all duration-200 border-2 relative overflow-hidden";
  
  const variants = {
    primary: `
      bg-gradient-to-r from-primary to-cyan-300 
      border-primary text-background
      hover:shadow-neon-strong hover:scale-105
      active:scale-95
    `,
    secondary: `
      bg-gradient-to-r from-secondary to-magenta-300 
      border-secondary text-background
      hover:shadow-neon-strong hover:scale-105
      active:scale-95
    `,
    outline: `
      bg-transparent border-primary text-primary
      hover:bg-primary hover:text-background hover:shadow-neon
      active:scale-95
    `,
    ghost: `
      bg-transparent border-transparent text-primary
      hover:bg-primary/10 hover:border-primary hover:shadow-neon
      active:scale-95
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none' 
    : 'cursor-pointer';

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={disabled ? undefined : onClick}
      className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${disabledClasses}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 neon-text">
        {children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </motion.button>
  );
};

export default Button;