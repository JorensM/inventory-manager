
export default function debounce( callback: any, delay = 300 ){
    let timer: any;

    const fn = ( ...args: any[] ) => {
      clearTimeout( timer );
      timer = setTimeout( () => {
        callback( ...args );
        
      }, delay );
    }

    fn.cancel = () => {
      clearTimeout(timer);
    }

    return fn
}