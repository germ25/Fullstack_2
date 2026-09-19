const formatearPrecio=(numero)=> {
    return new Intl.NumberFormat('es-CL').format(numero);
};

const productos_catalogo=[
    {
        id: 1,
        nombre: "Prostar 5 lb",
        categoria: "Proteínas y suplementos",
        precio: 90000,
        stock: 5,
        imagen: "img/proteina.jpg"
    },
    {
        id: 2,
        nombre: "Creatina 300 g",
        categoria: "Proteínas y suplementos",
        precio: 50000,
        stock: 10,
        imagen: "img/creatina.jpg"
    }
]