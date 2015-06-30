$scope.goal = commaSeparateNumber(data.product.StaticSpecGroups.Goal.Specs.Goal.Value)
			if(data.product.RelatedProductsGroupID)
			{
				Product.search(null, null, data.product.RelatedProductsGroupID, function(products)
				{
					var sum = 0;
					for (var i = 0; i < products.length; i++)
					{
						var quantity = products[i].QuantityAvailable;
						var goal = products[i].StaticSpecGroups.Goal.Specs.Goal.Value;
						var newsum = goal - quantity;
						sum = sum + newsum;
					}

					sum = commaSeparateNumber(sum);
					$scope.totalSold = sum;
				});
			}
			else
			{
				var sum = 0;
				var quantity = data.product.QuantityAvailable;
				var goal = data.product.StaticSpecGroups.Goal.Specs.Goal.Value;
				sum = goal - quantity;
				sum = commaSeparateNumber(sum);
				$scope.totalSold = sum;
			}