export const funcUtil = {

    calcFechaHora:() => {
        const dato = new Date();
        const dia = dato.getDate();
        const mes = dato.getMonth() + 1;
        const ano = dato.getFullYear();
        const hor = dato.getHours();
        const min = dato.getMinutes();
        const seg = dato.getSeconds();
        const fecha = [dia, mes, ano].join("/").toString();
        const hora = [hor, min, seg].join(":").toString();
        return [fecha, hora].join(" ");
      }

}