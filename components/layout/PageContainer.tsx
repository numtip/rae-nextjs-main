type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PageContainer({ children, className = "" }: Props) {
  const classes = className ? `layout-container ${className}` : "layout-container";
  return <div className={classes}>{children}</div>;
}
