

const ExchageRateTrue = (prop) => {
  let {editablePrice, handlePriceChange}= prop
  return (
    <input
    className="flex-grow bg-gray-300 border border-transparent rounded-lg py-2 px-4 text-gray-700 focus:outline-none"
    name="dolar"
    value={editablePrice}
    onChange={handlePriceChange}
  />
  )
}

export default ExchageRateTrue