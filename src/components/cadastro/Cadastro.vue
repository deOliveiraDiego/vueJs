<template>
  <div>
    <h1 v-if="foto._id" class="centralizado">Edição</h1>
    <h1 v-else class="centralizado">Cadastro</h1>

    <h2 class="centralizado"></h2>

    <form @submit.prevent="save()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input
          name="titulo"
          id="titulo"
          autocomplete="off"
          v-model="foto.titulo"
          v-validate
          data-vv-rules="required|min:3|max:30"
          data-vv-as="título"
        />
        <span class="erro" v-show="errors.has('titulo')">{{errors.first('titulo')}}</span>
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input
          name="url"
          id="url"
          autocomplete="off"
          v-model="foto.url"
          v-validate
          data-vv-rules="required"
        />
        <span class="erro">{{ errors.first('url') }}</span>
        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.url" />
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.desc"></textarea>
      </div>

      <div class="centralizado">
        <meu-botao title="Gravar" type="submit" />
        <router-link :to="{name: 'home'}">
          <meu-botao title="Voltar" type="button" />
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Button from "../shared/button/Button.vue";
import Foto from "../../domain/Foto";
import FotoService from "../../domain/FotoService";

export default {
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Button
  },

  data() {
    return {
      foto: new Foto(),
      id: this.$route.params.id
    };
  },

  methods: {
    save() {
      this.$validator.validateAll().then(success => {
        if (success) {
          this.service.save(this.foto).then(
            () => {
              if (this._id) this.$router.push({ name: "home" });
              this.foto = new Foto();
            },
            err => console.log(err)
          );
        }
      });
    }
  },

  created() {
    this.service = new FotoService(this.$resource);

    if (this.id) {
      this.service.search(this.id).then(foto => (this.foto = foto));
    }
  }
};
</script>

<style scoped>
.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.controle label {
  display: block;
  font-weight: bold;
}

.controle label + input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.centralizado {
  text-align: center;
}

.erro {
  color: red;
}
</style>
