import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/api/product';
import { Question } from 'src/app/models/recruitment/Question';
import { ProductService } from 'src/app/service/productservice';
import { QuestionService } from 'src/app/service/recruitment/question.service';
@Component({
  selector: 'app-quetion',
  templateUrl: './quetion.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./quetion.component.scss', '../../../assets/demo/badges.scss']
})
export class QuetionComponent implements OnInit {

  productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteQuestionDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    deleteQuestionsDialog: boolean = false;

    products: Product[];

    product: Product;

    Question;

    selectedProducts: Product[];

    selectedQuestions;

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    isTableHasData = true;
    filtersocieties: any;
    isalladmin = false;
    quetions: Question[];
    filterquetions: Question[] = [];

    constructor(private router: Router, private productService: ProductService, private messageService: MessageService,
        private confirmationService: ConfirmationService, private quetionservice: QuestionService,) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            { field: 'Questionname', header: 'Questionname' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

        this.reloadData();
    }

    reloadData() {
        this.quetionservice.getquestionsList()
            .subscribe(data => {
                console.log(data)
                this.quetions = data;
            });
    }
    addQuestion() {
        this.router.navigate(["recruitment/add"]);
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    deleteSelectedQuestions() {
        this.deleteQuestionsDialog = true;
    }

    editQuestion(Question) {
        /*this.product = {...product};
        this.productDialog = true;*/
        this.router.navigate(["Question/edit", Question.id]);
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    deleteQuestion(Question) {
        this.deleteQuestionDialog = true;
        this.Question = { ...Question };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = null;
    }

    confirmDeleteQuestionsSelected(){
        this.deleteQuestionsDialog = false;
        this.quetions = this.quetions.filter(val => !this.selectedQuestions.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Questions Deleted', life: 3000 });
        this.selectedQuestions.forEach(Question => {
            this.quetionservice.deletequestion(Question.id)
                .subscribe(data => {
            });
        });
        this.selectedQuestions = null;
        
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }
    confirmDeleteQuestion() {
        this.deleteQuestionDialog = false;
        this.quetionservice.deletequestion(this.Question.id)
            .subscribe(data => {
                this.quetions = this.quetions.filter(val => val.id !== this.Question.id);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Question Deleted', life: 3000 });
                this.Question = {};
            });

    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
