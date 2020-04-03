import { Component, OnInit } from '@angular/core';
import { ProdutosService } from './produtos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  produtos = null;
  carrinho = [];

  constructor(private service: ProdutosService) { }

  ngOnInit(): void {
    this.service.lista()
      .subscribe((dados: any) => this.produtos = dados);
  }

  comprar(produto: any) {
    const produtoNoCarrinho = this.carrinho.find(
      (p: any) => p.id === produto.id
    );
    if (!produtoNoCarrinho) {
      this.carrinho.push({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: 1
      });
    } else {
      produtoNoCarrinho.quantidade += 1;
    }
  }

  calcularTotalDoCarrinho() {
    let total = 0;
    for (const produto of this.carrinho) {
      total += produto.preco * produto.quantidade;
    }
    return total;
  }
}
