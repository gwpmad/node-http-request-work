(function() {
  var apiCall = require('./apiCall.server.controller.js'),
    materialQuantities = {},
    topFiveMaterials = [],
    listingsJSON = [],
    returnObject = {},
    self = module.exports;

  exports.request = function(req, res) {
    var returnObject = {};
    apiCall(function(err, data) {
      if (err) {
        res.json({
          error: err
        });
      } else {
        self.generateReturnObject(returnObject, data.results);
        res.json(returnObject);
      }
    });
  };

  exports.generateReturnObject = function(returnObject, json) {
    console.log('materials generateReturnObject being called');
    populateMaterialQuantitiesObject(json);
    topFiveMaterials = populateArrayWithTopFiveMaterials(materialQuantities);
    populateListingsJSON(listingsJSON, json, topFiveMaterials, materialQuantities);
    returnObject.top_5_materials = listingsJSON;
  };

  populateMaterialQuantitiesObject = function(json) {
    for (i = 0; i < json.length; i++) {
      var materials = json[i].materials;
      for (j = 0; j < materials.length; j++) {
        if (materialQuantities[materials[j]]) {
          materialQuantities[materials[j]] += 1;
        } else {
          materialQuantities[materials[j]] = 1;
        }
      }
    }
    return materialQuantities;
  };

  populateArrayWithTopFiveMaterials = function(object) {
    var array = Object.keys(object);
    sortArrayByMaterialQuantity(array, object);
    array.splice(5, array.length - 5);
    return array;
  };

  populateListingsJSON = function(array, json, topFiveMaterials, materialQuantities) {
    for (i = 0; i < 5; i++) {
      var entry = {},
        material = topFiveMaterials[i];
      entry.name = material;
      entry.occurrences = materialQuantities[material];
      entry.listings = json.filter(function(listing) {
        return (listing.materials.indexOf(material) > -1);
      });
      array.push(entry);
    }
  };

  sortArrayByMaterialQuantity = function(array, object) {
    array.sort(function(a, b) {
      if (object[a] > object[b]) return 1;
      if (object[a] < object[b]) return -1;
      return 0;
    });
  };
})();
