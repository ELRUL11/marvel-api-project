function IndicatorBox({ text, value, style }) {
  const boxDefaultStyle = {
      width: 200,
      height: 200,
      border: '2px solid black',
      margin: 15,
      backgroundColor: 'grey',
      boxShadow: 'black 3px 3px'
  };
  const textDefaultStyle = {
      textAlign: 'center',
      padding: 20,
      fontWeight: 'bold'
  };
  const valueDefaultStyle = {
    textAlign: 'center',
    fontSize: 50,
    fontFamily:'Comic Neue'
};

  return (
      <div style={boxDefaultStyle}>
            <div style={textDefaultStyle}>{text}</div>
            <div style={valueDefaultStyle}>{value}</div>
      </div>

    );
  }
  
  export default IndicatorBox;