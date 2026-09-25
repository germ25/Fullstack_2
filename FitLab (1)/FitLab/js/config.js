const formatearPrecio=(numero)=> {
    return new Intl.NumberFormat('es-CL').format(numero);
};

const productos_catalogo=[
    {
        id: 1,
        nombre: "Prostar 5 lb",
        categoria: "Proteínas & aminoácidos",
        precio: 90000,
        stock: 12,
        imagen: "img/proteina.jpg"
    },
    {
        id: 2,
        nombre: "Creatina 300 g",
        categoria: "Proteínas & aminoácidos",
        precio: 50000,
        stock: 10,
        imagen: "img/creatina.jpg"
    },
    {
        id: 3,
        nombre: "Bandas Elásticas de Resistencia x5",
        categoria: "Equipamiento",
        precio: 12990,
        stock: 45,
        imagen: "img/bandas.jpg"
    },
    {
        id: 4,
        nombre: "Mancuernas Ajustables 10kg",
        categoria: "Equipamiento",
        precio: 89990,
        stock: 12,
        imagen: "img/mancuernas.jpg"
    },
    {
        id: 5,
        nombre: "Polera Deportiva DryFit",
        categoria: "Ropa Deportiva",
        precio: 19990,
        stock: 30,
        imagen: "img/polera-deportiva.jpg"
    },
    {
        id: 6,
        nombre: "Vitamina C + Zinc 60 cápsulas",
        categoria: "Vitaminas",
        precio: 14990,
        stock: 50,
        imagen: "img/vitamina-c.jpg"
    }
]