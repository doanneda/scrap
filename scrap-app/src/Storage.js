// import PropTypes from 'prop-types';
// import * as SecureStore from 'react-secure-store';

// export default function Storage({ key, value, saveKey }) {
//   async function save() {
//     await SecureStore.setItemAsync(key, value).then();
//   }
//   async function getValue() {
//     const result = await SecureStore.getItemAsync(key);
//     if (!result) {
//       console.log('No values stored under that key.');
//       return 'No values stored under this key.';
//     }
//     return result;
//   }

//   if (saveKey) {
//     save();
//   } else {
//     return getValue();
//   }
// }

// Storage.propTypes = {
//   key: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.string),
//     PropTypes.arrayOf(PropTypes.object),
//   ]).isRequired,
//   saveKey: PropTypes.bool,
// };

// Storage.defaultProps = {
//   saveKey: false,
// };