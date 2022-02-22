function PageWrapper(props) {
  return (
    <div
      style={{
        boxShadow: '0 4px 8px 0 rgb(36 46 66 / 6%)',
        padding: '24px 20px',
        borderRadius: '4px',
        backgroundColor: '#fff',
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}
export default PageWrapper;
