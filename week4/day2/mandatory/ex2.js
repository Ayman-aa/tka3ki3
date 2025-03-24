const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th","st","nd","rd"];


const colorOrder = () => {
  for (let i = 0; i < colors.length; i++) {
    const suffix = (i === 0) ? ordinal[1] : (i === 1) ? ordinal[2] : (i === 2) ? ordinal[3] : ordinal[0];
    console.log(`${i + 1}${suffix} choice is ${colors[i]}`);
  }
}
colorOrder()