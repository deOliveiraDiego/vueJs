<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <input
      type="search"
      class="filtro"
      @input="filtro = $event.target.value"
      placeholder="filtre por parte do título"
    />

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto.id">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo" v-transform:scale.animate="1.2" />
          <router-link :to="{name: 'edit', params:{id: foto._id}}">
            <diButton title="Alterar" type="button" />
          </router-link>
          <diButton
            title="Remover"
            type="button"
            :confirm="true"
            styleBtn="danger"
            @newClick="remove(foto)"
          />
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Button from "../shared/button/Button.vue";
import transform from "../../directives/Transform";
import FotoService from "../../domain/FotoService";

export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
    diButton: Button
  },

  directives: {
    transform: transform
  },

  methods: {
    remove(foto) {
      this.service.delete(foto._id).then(
        () => {
          let index = this.fotos.indexOf(foto);
          this.fotos.splice(index, 1);
          this.mensagem = "Foto removida com sucesso.";
        },
        err => (this.mensagem = err.message)
      );
    }
  },

  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
      filtro: "",
      mensagem: ""
    };
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },

  created() {
    this.service = new FotoService(this.$resource);

    this.service.getList().then(
      fotos => (this.fotos = fotos),
      err => {
        this.mensagem = err.message;
      }
    );
  }
};
</script>

<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>
