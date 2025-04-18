const {
  client,
  createTables,
  createUser,
  createProduct,
  fetchUsers,
  fetchProducts,
  createFavorite,
  fetchFavorites,
  destroyFavorite,
} = require("./db");

const seed = async () => {
  await client.connect();

  await createTables();
  console.log("tables created");

  const [jdog, kdawg, tdahg, pdogg, laptop, tv, couch, bed] = await Promise.all(
    [
      createUser("jdog", "poop123"),
      createUser("kdawg", "pee123"),
      createUser("tdahg", "poopoo123"),
      createUser("pdogg", "peepee123"),
      createProduct("laptop"),
      createProduct("tv"),
      createProduct("couch"),
      createProduct("bed"),
    ]
  );

  console.log("users created");
  console.log(await fetchUsers());

  console.log("products created");
  console.log(await fetchProducts());

  const [user_favorite] = await Promise.all([
    createFavorite(jdog.id, tv.id),
    createFavorite(kdawg.id, laptop.id),
    createFavorite(pdogg.id, bed.id),
  ]);

  console.log("user favorites created");
  console.log(await fetchFavorites(kdawg.id));

  await destroyFavorite(user_favorite.id, pdogg.id);

  console.log("deleted favorite");
  console.log(await fetchFavorites(pdogg.id));

  await client.end();
};

seed();
