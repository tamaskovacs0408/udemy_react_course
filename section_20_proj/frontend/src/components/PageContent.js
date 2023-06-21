import classes from './PageContent.module.scss';
const PageContent = ({ title, children }) => {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;