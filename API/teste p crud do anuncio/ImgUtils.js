class ImgUtils{
    static setOpcoes(opcoes){
        if(opcoes){
            this.tamanho_max_foto_mb = opcoes.tamanho_max_foto || 3;
            this.num_max_fotos = opcoes.max_fotos || 10;
        } else {
            this.tamanho_max_foto_mb = 3;
            this.num_max_fotos = 10;
        }
    }

    static convParaBase64(input_file, callback){

        const isFoto = (foto) => {
            const formatos_aceitos = ['image/jpeg', 'image/png'];

            return formatos_aceitos.includes(foto['type']);
        }

        const tamanhoIsOk = (foto) => {
            const tamanho_max_foto_bytes = this.tamanho_max_foto_mb * 1000000;

            return foto.size <= tamanho_max_foto_bytes;
        };

        const isFotoValida = (foto) => {
            return new Promise((resolve, reject) => {
               if(foto){
                   if(isFoto(foto)){

                       if(tamanhoIsOk(foto)){
                           resolve();
                       } else {
                           reject("As foto devem ter um tamanho máximo de " + this.tamanho_max_foto_mb + " MB")
                       }

                   } else {
                       reject("Escolha apenas fotos")
                   }
               }
               
            });
        }

        return new Promise((resolve, reject) => {

            var fotos = input_file.files;

            this.array_fotos_base64 = [];

            let i = 0;

            var reader = new FileReader();

            reader.onloadend = () => {
                const foto_base64 = reader.result;

                this.array_fotos_base64.push(foto_base64)

                i++;

                if(i < fotos.length){

                    isFotoValida(fotos[i])
                    .then(() => {
                        reader.readAsDataURL(fotos[i]);
                    })
                    .catch((err) => {
                        this.array_fotos_base64 = [];
                        reject(err)
                    })

                } else {
                    resolve();
                }

            }

            isFotoValida(fotos[0])
            .then(() => {
                reader.readAsDataURL(fotos[0]);
            })
            .catch((err) => {
                this.array_fotos_base64 = [];
                reject(err)
            })
        })

    }

    static carregarParaDiv(div){
        return new Promise((resolve, reject) => {

            const fotos_carregadas = div.getElementsByTagName("img").length;

            const num_fotos = this.array_fotos_base64.length + fotos_carregadas;

            if(num_fotos <= this.num_max_fotos){

                this.array_fotos_base64.map(foto_base64 => {

                    var nova_img = document.createElement('img');

                    nova_img.src = foto_base64;

                    nova_img.width = 100;
                    nova_img.height = 100;

                    div.innerHTML += nova_img.outerHTML; 
                });

                this.array_fotos_base64 = [];

                resolve();
            } else {
                this.array_fotos_base64 = [];
                
                const num_fotos_restantes = this.num_max_fotos - fotos_carregadas;

                if(num_fotos_restantes != 0){
                    reject("Escolha até no maximo " + num_fotos_restantes + " fotos");

                } else {
                    reject("Limite de fotos atingido, remova alguma antes de adionar uma nova");
                }
            }
        })

    }
    
    static fotosDaDivParaBase64(div){
        return new Promise ((resolve, reject) => {
            
            const imgs = div.getElementsByTagName("img");
        
            if(imgs.length != 0){
                let array_fotos_base64 = [];
        
                for(let i = 0; i < imgs.length; i++){
                    array_fotos_base64.push(imgs[i].src); 
                }
                console.log(array_fotos_base64)
                resolve(array_fotos_base64);
				
            } else {
                reject("Selecione uma foto!");
            }
        });
    }
}















