

El objetivo de este software es facilitar la organización de fotos de manera sencilla a través del etiquetado, asignando valores específicos a cada imagen.

La unidad principal en el sistema es el **proyecto**, el cual se define como un conjunto de visitas a un área delimitada. Un proyecto incluye fotos tomadas en distintos puntos del área en diferentes momentos.

La estructura del sistema es la siguiente:

- **Proyecto**: Un conjunto de todas las fotos tomadas en diferentes fechas y puntos dentro del área de interés.
    - **Punto**: Un conjunto de fotos tomadas en un área específica dentro del proyecto.
        - **Álbum**: Un conjunto de fotos tomadas en un momento particular del proyecto.
            - **Imagen**: La unidad básica, una foto individual dentro de un álbum.

Cada nivel de la estructura organiza las fotos de manera jerárquica, facilitando su búsqueda y gestión.


Para poder empezar con la organización es necesario crear un proyecto, este consta de un nombre y descripción con el fin de dar una contextualización sobre este. Los puntos son con el fin de poder organizar los diferentes puntos visitados en el área delimitada, de esta manera se contempla que el área visitada no será abarcada en totalidad, si no que puntos definidos para poder realizar fotos sobre estás áreas, De esta manera puede existir la necesidad de comparar las fotos de un mismo el punto, para esto existen los álbumes, en cada uno será un conjunto de fotos en una visita determinada en un proyecto.

Existirán categorías como: Substractos, árboles altos, árboles medianos, etc. Cada una de estas tendrán medidas a calificar según la categoría a la que pertenecen.
Es decir que:
Imagen -> Etiqueta -> Categoría

z-20 contenido
z-30 barra de navegacion
z-40 etiquetador
z-50 vista completa de imagenes

👉 [Repositorio backend ](https://github.com/rafaelmerlin23/picture_classification)
