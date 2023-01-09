const fetch = require("node-fetch");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
const PORT = 8999;

app.get("/:cep", async function (req, res) {
  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${req.params.cep}/json/`
    );
    const { cep, logradouro, localidade, uf } = response.json;
    res.send({
      cep,
      logradouro,
      localidade,
      uf,
    });
  } catch (error) {
    console.log(error);
    res.send({
      error: "Desculpe, não foi possível encontrar o CEP informado.",
    });
  }
});

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
