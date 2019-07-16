export default class FotoService {
  constructor(resource) {
    this._resource = resource('v1/fotos{/id}');
  }

  post(foto) {
    if (foto._id) {
      return this._resource.update({ id: foto._id }, foto);
    } else {
      return this._resource.save(foto);
    }
  }

  getList() {
    return this._resource
      .query()
      .then(res => res.json(),
        err => {
          console.log(err);
          throw new Error('Não foi possível obter as fotos. Tente novamente.');
        }
      )
  }

  delete(id) {
    return this._resource.delete(id).then(null, err => {
      console.log(err);
      throw new Error('Não foi possível remover a foto. Tente novamente.');
    })
  }

  search(id) {
    return this._resource
      .query({ id })
      .then(res => res.json());
  }
}