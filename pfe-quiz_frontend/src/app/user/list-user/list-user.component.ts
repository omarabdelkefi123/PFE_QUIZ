import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/api/product';
import { Administrator } from 'src/app/models/user/administrator';
import { ProductService } from 'src/app/service/productservice';
import { AdminService } from 'src/app/service/user/admin.service';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['./list-user.component.scss', '../../../assets/demo/badges.scss']
})
export class ListUserComponent implements OnInit {

    productDialog: boolean;

    deleteProductDialog: boolean = false;

    deleteUserDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    deleteUsersDialog: boolean = false;

    products: Product[];

    product: Product;

    user;

    selectedProducts: Product[];

    selectedUsers;

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    isTableHasData = true;
    filtersocieties: any;
    isalladmin = false;
    administrators: Administrator[];
    filteradministrators: Administrator[] = [];

    constructor(private router: Router, private productService: ProductService, private messageService: MessageService,
        private confirmationService: ConfirmationService, private administratorservice: AdminService,) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            { field: 'username', header: 'username' },
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
        this.administratorservice.getadministratorList()
            .subscribe(data => {
                console.log(data)
                this.administrators = data;
            });
    }
    addUser() {
        this.router.navigate(["user/add"]);
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    deleteSelectedUsers() {
        this.deleteUsersDialog = true;
    }

    editUser(user) {
        /*this.product = {...product};
        this.productDialog = true;*/
        this.router.navigate(["user/edit", user.id]);
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    deleteUser(user) {
        this.deleteUserDialog = true;
        this.user = { ...user };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = null;
    }

    confirmDeleteUsersSelected(){
        this.deleteUsersDialog = false;
        this.administrators = this.administrators.filter(val => !this.selectedUsers.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
        this.selectedUsers.forEach(user => {
            this.administratorservice.deleteadministrator(user.id)
                .subscribe(data => {
            });
        });
        this.selectedUsers = null;
        
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }
    confirmDeleteUser() {
        this.deleteUserDialog = false;
        this.administratorservice.deleteadministrator(this.user.id)
            .subscribe(data => {
                this.administrators = this.administrators.filter(val => val.id !== this.user.id);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
                this.user = {};
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
