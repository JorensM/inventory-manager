export default function debounce( callback: Function, delay = 300 ){
    let timer: any;
    return ( ...args: any[] ) => {
      clearTimeout( timer );
      timer = setTimeout( () => {
        callback( ...args );
      }, delay );
    }
}