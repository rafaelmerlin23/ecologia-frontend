import React from 'react'
import Grid from './Grid'
import TarjetaPuntos from './TarjetaPuntos'
    

    const imagen = "https://static.nationalgeographicla.com/files/styles/image_3200/public/nationalgeographic_2720812.jpg?w=1600&h=1061"
    const nombre = "punto"
    const coordenadas = "17.952708, -94.910466"
    let puntos = []

    for(let i = 0;i<30;i++){
    puntos.push({imagen:imagen,coordenadas:coordenadas,nombre:nombre+" "+i,indice:i})
    }
   
   
    const  gridInfraestructura= {
      sm:2,
      md:2,
      lg:2,
      xl:4,
    }
function GridPunto() {
  return (
    <Grid gridInfraestructura={gridInfraestructura}>
        {puntos.map( punto =><TarjetaPuntos coordenadas={punto.coordenadas} nombre={punto.nombre} key={punto.indice} imagen={punto.imagen}/>)}
    </Grid>
  )
}

export default GridPunto
