function staus(request, response) {
  response.status(200).json({ status: "teste do send á" });
}

export default staus;
