import React from 'react';

const OptionBox = (props) => {
  return (
    <div className="option-boxs">
      <table className="checkbox-grid">
        <tbody>
          <tr><td><input type="checkbox" name="text1" value="value1" /></td><td><label htmlFor="text1">Text 1</label></td></tr>
          <tr><td><input type="checkbox" name="text2" value="value2" /></td><td><label htmlFor="text2">Text 2</label></td></tr>
          <tr><td><input type="checkbox" name="text3" value="value3" /></td><td><label htmlFor="text3">Text 3</label></td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default OptionBox;
