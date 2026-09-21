const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Prices are in grosze (1/100 PLN), so 25000 = 250.00 PLN
async function seedProducts() {
  try {
    await prisma.products.createMany({
      data: [
        {
          title: "Bouquet roses",
          description:
            "Bouquets of 11, 15, 19, 23, 25, 31, 35, 51 and 101 roses on photos. Flowers used: peony-shaped rose (length: 50-60 cm)",
          url: "https://bunchovflowers.pl/2099-large_default/bouquet-of-country-blues-roses.jpg",
          price: 25000,
        },
        {
          title: "Large  limonium",
          description: "Size L on photo. Flowers used: limonium",
          url: "https://bunchovflowers.pl/950-large_default/large-bouquet-of-limonium.jpg",
          price: 25000,
        },
        {
          title: "Flowerbox",
          description:
            "Sizes S and L on photos. Flowers used: rose, eustoma, spray rose, gerbera, clematis, dianthus, gypsophila, eucalyptus and additives",
          url: "https://bunchovflowers.pl/438-large_default/bf-259-.jpg",
          price: 19000,
        },
        {
          title: "Flower Basket",
          description:
            "Size S on photo. Flowers used: gerbera, gypsophila, dianthus, tulip, eustoma, eucalyptus",
          url: "https://bunchovflowers.pl/538-large_default/bf-341.jpg",
          price: 20000,
        },
        {
          title: "Bouquet of ranunculuses",
          description:
            "Bouquet of 19 and 31 pcs on photos. Flowers used: ranunculus Ranunculus of the Hanoi variety is distinguished by its incredible persistence and beauty. Tightly closed petals open and this delicate flower looks even more magnificent!",
          url: "https://bunchovflowers.pl/1977-large_default/bouquet-of-ranunculuses.jpg",
          price: 47500,
        },
        {
          title: "Classic pink peonies",
          description:
            "Bouquets of 9, 13, 15, 19 pcs on photos. Flowers used: peonies",
          url: "https://bunchovflowers.pl/1725-large_default/classic-pink-peonies.jpg",
          price: 72000,
        },
        {
          title: "Lilac bouquet",
          description: "Size S on photo. Flowers used: lilac",
          url: "https://bunchovflowers.pl/1565-large_default/lilac-bouquet.jpg",
          price: 27000,
        },
        {
          title: "Bouquet of pink hydrangeas",
          description: "Bouquet of 5 stems on photo. Flowers used: hydrangea",
          url: "https://bunchovflowers.pl/607-large_default/bouquet-of-pink-hydrangeas.jpg",
          price: 30000,
        },
        {
          title: "Camomile bouquet",
          description: "Sizes XS, S, M and L on photos. Flowers used: camomile",
          url: "https://bunchovflowers.pl/867-large_default/camomile-bouquet.jpg",
          price: 20000,
        },
        {
          title: "White tulips",
          description:
            "Bouquets of 25, 35, and 51 pcs on photos. Flowers used: tulip",
          url: "https://bunchovflowers.pl/2119-large_default/white-tulips.jpg",
          price: 21000,
        },
        {
          title: "Pink alstroemeria bouquet",
          description: "Sizes S and M on photos. Flowers used: alstroemeria",
          url: "https://bunchovflowers.pl/1550-large_default/pink-alstroemeria-bouquet.jpg",
          price: 12500,
        },
        {
          title: "Bouquet of white chrysanthemums",
          description:
            "Bouquets of 9, 13 pcs on photos. Flowers used: chrysanthemum",
          url: "https://bunchovflowers.pl/984-large_default/bouquet-of-white-chrysanthemums.jpg",
          price: 12600,
        },
        {
          title: "Bouquet of carnations",
          description:
            "Sizes S, M and L on photos. Flowers used: carnation, eucalyptus",
          url: "https://bunchovflowers.pl/327-large_default/bouquet-of-carnations.jpg",
          price: 15500,
        },
        {
          title: "Bouquet of gerberas",
          description:
            "Sizes XS and S on photos. Flowers used: gerbera, gypsophila",
          url: "https://bunchovflowers.pl/305-large_default/bouquet-of-gerberas.jpg",
          price: 10000,
        },
        {
          title: "Modern bride's bouquet",
          description:
            "Modern bride's bouquet. Please contact us before placing your order to discuss details, confirm availability and price",
          url: "https://bunchovflowers.pl/1221-large_default/modern-bride-s-bouquet.jpg",
          price: 25000,
        },
        {
          title: "Boho wedding bouquet",
          description:
            "Bride's bouquet in boho style. Please contact us before placing your order to discuss details, confirm availability and price",
          url: "https://bunchovflowers.pl/1211-large_default/boho-wedding-bouquet.jpg",
          price: 35000,
        },
        {
          title: "Seasonal bride's bouquet",
          description:
            "Bride's bouquet made of seasonal flowers in pastel colors. Please contact us before placing your order to discuss details, confirm availability and price",
          url: "https://bunchovflowers.pl/1050-large_default/seasonal-bride-s-bouquet.jpg",
          price: 35000,
        },
        {
          title: "Petite bride's bouquet",
          description:
            "Trendy petite bride's bouquet. Please contact us before placing your order to discuss details, confirm availability and price",
          url: "https://bunchovflowers.pl/780-large_default/petite-bride-s-bouquet-.jpg",
          price: 21000,
        },
        {
          title: "Bouquet of dried flowers 4",
          description:
            "A bouquet of natural dried arrangements is perfect addition to the interior",
          url: "https://bunchovflowers.pl/1390-large_default/bouquet-of-dried-flowers-4.jpg",
          price: 28000,
        },
        {
          title: "Pink alstroemeria bouquet",
          description: "Sizes S and M on photos. Flowers used: alstroemeria",
          url: "https://bunchovflowers.pl/1550-large_default/pink-alstroemeria-bouquet.jpg",
          price: 12500,
        },
        {
          title: "White alstroemeria bouquet",
          description: "Sizes XS and S on photos. Flowers used: alstroemeria",
          url: "https://bunchovflowers.pl/457-large_default/white-alstroemeria-bouquet.jpg",
          price: 11900,
        },
      ],
    });
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
