// src/main/java/com/example/egov/model/TaxPaymentRequest.java
package com.example.egov.model;

public class TaxPaymentRequest {
    private String taxId;
    private String taxPeriod;
    private double taxAmount;
    private String taxType;
    private String paymentMethod;

    // Getters and Setters

    public String getTaxId() {
        return taxId;
    }

    public void setTaxId(String taxId) {
        this.taxId = taxId;
    }

    public String getTaxPeriod() {
        return taxPeriod;
    }

    public void setTaxPeriod(String taxPeriod) {
        this.taxPeriod = taxPeriod;
    }

    public double getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(double taxAmount) {
        this.taxAmount = taxAmount;
    }

    public String getTaxType() {
        return taxType;
    }

    public void setTaxType(String taxType) {
        this.taxType = taxType;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    @Override
    public String toString() {
        return "TaxPaymentRequest{" +
                "taxId='" + taxId + '\'' +
                ", taxPeriod='" + taxPeriod + '\'' +
                ", taxAmount=" + taxAmount +
                ", taxType='" + taxType + '\'' +
                ", paymentMethod='" + paymentMethod + '\'' +
                '}';
    }
}