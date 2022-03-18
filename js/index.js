let recetas = {
    charcoal: [
        { mat: "wood", cant: 2 }
    ],
    iron_ingot: [
        { mat: "iron_ore", cant: 4 }
    ],
    steel_ingot: [
        { mat: "iron_ingot", cant: 3 },
        { mat: "obsidian_flux", cant: 1 },
        { mat: "charcoal", cant: 2 }
    ],
    starmetal_ingot: [
        { mat: "starmetal_ore", cant: 6 },
        { mat: "steel_ingot", cant: 2 },
        { mat: "obsidian_flux", cant: 1 },
        { mat: "charcoal", cant: 2 }
    ],
    orichalcum_ingot: [
        { mat: "orichalcum_ore", cant: 8 },
        { mat: "starmetal_ingot", cant: 2 },
        { mat: "obsidian_flux", cant: 1 },
        { mat: "charcoal", cant: 2 }
    ],
    asmodeum: [
        { mat: "orichalcum_ingot", cant: 5 },
        { mat: "tolvium", cant: 1 },
        { mat: "cinnabar", cant: 1 },
        { mat: "obsidian_flux", cant: 1 },
        { mat: "charcoal", cant: 2 }
    ]
}

let lenguaje = {
    wood: { eng: 'wood', spa: 'madera' },
    charcoal: { eng: 'charcoal', spa: 'carbon' },
    iron_ore: { eng: 'iron ore', spa: 'mena de hierro' },
    iron_ingot: { eng: 'iron ingot', spa: 'lingote de hierro' },
    steel_ingot: { eng: 'steel ingot', spa: 'lingote de acero' },
    starmetal_ore: { eng: 'starmetal ore', spa: 'mena de metal estelar' },
    starmetal_ingot: { eng: 'starmetal ingot', spa: 'lingote de metal estelar' },
    orichalcum_ore: { eng: 'orichalcum ore', spa: 'mena de oricalco' },
    orichalcum_ingot: { eng: 'orichalcum ingot', spa: 'lingote de oricalco' },
    tolvium: { eng: 'tolvium', spa: 'tolvio' },
    cinnabar: { eng: 'cinnabar', spa: 'cinabarita' },
    asmodeum: { eng: 'asmodeum ingot', spa: 'lingote de asmodeum' },
    obsidian_flux: { eng: 'obsidian flux', spa: 'flujo de obsidiana' },
}

var materiales_base = {};
var leng = 'spa';

document.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById('calcular').addEventListener('click', event => {
        index = 0;
        let item = document.getElementById('option').value;
        let cant = document.getElementById('cantidad').value;
        leng = document.getElementById('idioma').value;
        console.log(leng);
        materiales_base = [];
        let receta = [];
        receta = llenarReceta(item, cant);
        let lista = '';
        lista = armarLista(receta);
        document.getElementById('lista').innerHTML = lista;
        let texto = armarListaResumen();
        document.getElementById('listaResumen').innerHTML = texto;
        document.getElementById('crafteando').innerHTML = `Materiales para: ${lenguaje[item][leng]} x ${cant}`;
    });
});


function llenarReceta(item, cant) {
    let receta = [];
    if (recetas[item] !== undefined) {
        for (let elem of recetas[item]) {
            if (recetas[elem.mat] !== undefined) { //existe receta
                receta.push({ mat: elem.mat, cant: elem.cant * cant, recetaPrevia: llenarReceta(elem.mat, elem.cant * cant) });
            } else {
                receta.push({ mat: elem.mat, cant: elem.cant * cant, recetaPrevia: undefined });
                if (materiales_base[elem.mat] !== undefined) {
                    materiales_base[elem.mat] += elem.cant * cant;
                } else {
                    materiales_base[elem.mat] = elem.cant * cant;
                }
            }
        }
    }
    return receta;
}

function armarLista(receta) {
    lista = `<ul class="subReceta">`;
    for (let elem of receta) {
        if (elem.recetaPrevia !== undefined) {
            lista += `<li>${lenguaje[elem.mat][leng]} x ${elem.cant}${armarLista(elem.recetaPrevia)}</li>`;
        } else {
            lista += `<li>${lenguaje[elem.mat][leng]} x ${elem.cant}</li>`;
        }
    }
    lista += `</ul>`;
    return lista;
}

function armarListaResumen() {
    let listaResumen = `<table class="table">
    <thead>
      <tr>
        <th scope="col">Material</th>
        <th scope="col">Cantidad</th>
      </tr>
    </thead>
    <tbody>`;
    for (elem in materiales_base) {
        listaResumen += `<tr>
        <th scope="row">${lenguaje[elem][leng]}</th>
        <td>${materiales_base[elem]}</td>
      </tr>`;
    }
    listaResumen += `</tbody>
    </table>`
    return listaResumen;
}