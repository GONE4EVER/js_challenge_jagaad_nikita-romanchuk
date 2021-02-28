const parseResponse = async res => {
  const { data, error } = await res;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default parseResponse;
