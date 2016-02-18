(function() {
  var rewire = require('rewire'),
    materialsController = rewire('../app/controllers/materials.server.controller.js');

  describe('materials controller', function() {
    var dummyObject = [{
        'materials': ['satin', 'leather', 'gold']
      }, {
        'materials': ['gold', 'sequins', 'cotton']
      }],
      quantitiesObject = {
        'satin': 1,
        'leather': 1,
        'gold': 2,
        'sequins': 1,
        'cotton': 1
      },
      materialsArray = [
        'satin',
        'leather',
        'gold',
        'sequins',
        'cotton'
      ],
      materialsArraySortedByQuantity = [
        'satin',
        'leather',
        'sequins',
        'cotton',
        'gold'
      ],
      dummyArray = [],
      dummyListingsJSON = [{
        name: 'satin',
        occurrences: 1,
        listings: [{
          materials: ['satin', 'leather', 'gold']
        }]
      }, {
        name: 'leather',
        occurrences: 1,
        listings: [{
          materials: ['satin', 'leather', 'gold']
        }]
      }, {
        name: 'sequins',
        occurrences: 1,
        listings: [{
          materials: ['gold', 'sequins', 'cotton']
        }]
      }, {
        name: 'cotton',
        occurrences: 1,
        listings: [{
          materials: ['gold', 'sequins', 'cotton']
        }]
      }, {
        name: 'gold',
        occurrences: 2,
        listings: [{
          materials: ['satin', 'leather', 'gold']
        }, {
          materials: ['gold', 'sequins', 'cotton']
        }]
      }];

    it('creates an object with the quantities of each material', function() {
      expect(populateMaterialQuantitiesObject(dummyObject))
        .toEqual(quantitiesObject);
    });

    it('adds the top five materials to an array, ordered by quantity', function() {
      expect(populateArrayWithTopFiveMaterials(quantitiesObject))
        .toEqual(materialsArraySortedByQuantity);
    });

    it('sorts an array by the quantities of its elements in a provided object', function() {
      sortArrayByMaterialQuantity(materialsArray, quantitiesObject);
      expect(materialsArray).toEqual(materialsArraySortedByQuantity);
    });

    it('creates JSON with listings', function() {
      populateListingsJSON(dummyArray, dummyObject, materialsArraySortedByQuantity, quantitiesObject);
      expect(dummyArray).toEqual(dummyListingsJSON);
    });

    describe('generating the return object', function() {
      beforeEach(function() {
        populateMaterialQuantitiesObject = jasmine.createSpy();
        populateArrayWithTopFiveMaterials = jasmine.createSpy();
        populateListingsJSON = jasmine.createSpy();
      });

      it('should call all the relevant methods when creating the return object', function() {
        generateReturnObject(dummyObject);
        expect(populateMaterialQuantitiesObject).toHaveBeenCalledWith(dummyObject);
        expect(populateArrayWithTopFiveMaterials).toHaveBeenCalled();
        expect(populateListingsJSON).toHaveBeenCalled();
      });
    });

  });
})();
