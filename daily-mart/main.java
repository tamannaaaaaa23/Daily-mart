import java.util.*;

class Product {
    int id;
    String name;
    double price;
    int stock;

    Product(int id, String name, double price, int stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    void display() {
        System.out.println(id + " | " + name + " | $" + price + " | Stock: " + stock);
    }
}

class User {
    int id;
    String name;
    String email;

    User(int id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    void displayProfile() {
        System.out.println("User ID: " + id);
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
    }
}

class Cart {
    ArrayList<Product> items = new ArrayList<>();

    void addProduct(Product p) {
        items.add(p);
        System.out.println(p.name + " added to cart.");
    }

    void removeProduct(int id) {
        items.removeIf(product -> product.id == id);
    }

    void showCart() {
        System.out.println("\n===== CART =====");
        for (Product p : items) {
            System.out.println(p.name + " - $" + p.price);
        }
    }

    double getTotal() {
        double total = 0;
        for (Product p : items) {
            total += p.price;
        }
        return total;
    }
}

class Order {
    int orderId;
    String status;
    double totalAmount;

    Order(int orderId, double totalAmount) {
        this.orderId = orderId;
        this.totalAmount = totalAmount;
        this.status = "Pending";
    }

    void processOrder() {
        status = "Processing";
    }

    void completeOrder() {
        status = "Completed";
    }

    void displayOrder() {
        System.out.println("\nOrder ID: " + orderId);
        System.out.println("Total: $" + totalAmount);
        System.out.println("Status: " + status);
    }
}

class InventoryManager {
    ArrayList<Product> inventory = new ArrayList<>();

    void addProduct(Product p) {
        inventory.add(p);
    }

    void displayInventory() {
        System.out.println("\n===== INVENTORY =====");
        for (Product p : inventory) {
            p.display();
        }
    }

    Product searchProduct(int id) {
        for (Product p : inventory) {
            if (p.id == id) {
                return p;
            }
        }
        return null;
    }
}

class PaymentGateway {
    boolean processPayment(double amount) {
        System.out.println("Processing payment of $" + amount);
        return true;
    }
}

class Admin {
    String username;

    Admin(String username) {
        this.username = username;
    }

    void generateReport(InventoryManager manager) {
        System.out.println("\n===== ADMIN REPORT =====");
        manager.displayInventory();
    }
}

public class DailyMartSystem {

    static void displayMenu() {
        System.out.println("\n===== DAILY MART =====");
        System.out.println("1. View Products");
        System.out.println("2. Add Product to Cart");
        System.out.println("3. View Cart");
        System.out.println("4. Checkout");
        System.out.println("5. Exit");
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        InventoryManager manager = new InventoryManager();

        Product p1 = new Product(101, "Rice", 50, 100);
        Product p2 = new Product(102, "Milk", 90, 50);
        Product p3 = new Product(103, "Bread", 40, 80);
        Product p4 = new Product(104, "Eggs", 120, 60);
        Product p5 = new Product(105, "Juice", 150, 30);

        manager.addProduct(p1);
        manager.addProduct(p2);
        manager.addProduct(p3);
        manager.addProduct(p4);
        manager.addProduct(p5);

        User user = new User(1, "Tamanna", "tamanna@email.com");
        Cart cart = new Cart();
        PaymentGateway payment = new PaymentGateway();

        user.displayProfile();

        boolean running = true;

        while (running) {

            displayMenu();
            System.out.print("Enter choice: ");
            int choice = sc.nextInt();

            switch (choice) {

                case 1:
                    manager.displayInventory();
                    break;

                case 2:
                    System.out.print("Enter Product ID: ");
                    int id = sc.nextInt();

                    Product found = manager.searchProduct(id);

                    if (found != null) {
                        cart.addProduct(found);
                    } else {
                        System.out.println("Product not found!");
                    }
                    break;

                case 3:
                    cart.showCart();
                    System.out.println("Total = $" + cart.getTotal());
                    break;

                case 4:
                    double total = cart.getTotal();

                    if (payment.processPayment(total)) {

                        Order order = new Order(
                                new Random().nextInt(10000),
                                total
                        );

                        order.processOrder();
                        order.completeOrder();
                        order.displayOrder();

                        System.out.println("Checkout Successful!");
                    }
                    break;

                case 5:
                    running = false;
                    System.out.println("Thank you for using Daily Mart!");
                    break;

                default:
                    System.out.println("Invalid Choice!");
            }
        }

        Admin admin = new Admin("SystemAdmin");
        admin.generateReport(manager);

        sc.close();
    }
}