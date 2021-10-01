const fs = require("fs");
const express = require("express");
const app = express();
var path = require("path");
const port = 3000;
const Konva = require("konva/cmj").default;
var base64Img = require("base64-img");

app.get("/", (req, res) => {
  var options = {
    root: path.join(__dirname),
  };

  var fileName = "my-image-name.jpeg";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

app.get("/initial", (req, res) => {
  var options = {
    root: path.join(__dirname),
  };
  let stage = new Konva.Stage({
    width: 500,
    height: 500,
  });

  let layer = new Konva.Layer();
  stage.add(layer);
  layer.add(
    new Konva.Rect({
      width: 500,
      height: 500,
      fill: "#1a2b3c",
    })
  );

  var Text = new Konva.Text({
    text: req.query.id,
    fill: "#FFFFFF",
    fontSize :200
  });

  Text.setAttrs({
    x: 250,
    y: 250,
    offset: {
      x: Text.size().width / 2,
      y: Text.size().height / 2,
    },
  });

  layer.add(Text);

  layer.draw();
  var data = stage.toDataURL();

  var filepath = base64Img.imgSync(data, "", "image");

  res.sendFile(filepath, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", filepath);
    }
  });
});

app.listen(port, () => {
  console.log(`Avatar API listening running......`);
});
