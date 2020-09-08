const a = 1;

function fn1() {
    let b = 2;
    console.log(a);

    function fn2() {
        let c = 3;
        console.log(a);

        function fn3() {
            let d = 4;
            console.log(a, b, c, d);
        }
    }
}