import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import certificateThunks from "./certificateThunk";
import type { ICertificate } from "../../types/resume/CertificateType";

interface CertificateState{
    certificates: ICertificate[];
    loading: boolean,
    error?: string,
    isSubmitting: boolean
}

const initialState: CertificateState = {
    loading: false,
    error: undefined,
    isSubmitting:false,
    certificates: []

}

export const certificateSlice = createSlice({
    name: "certificate",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        //get all certifiactes
        builder.addCase(certificateThunks.getAllCertificates.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(certificateThunks.getAllCertificates.fulfilled, (state, action) => {
            state.certificates = action.payload.data
            state.loading = false;
        })
        builder.addCase(certificateThunks.getAllCertificates.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false
            toast.error(action.payload.errorMessage)
        })

        //create certificate
        builder.addCase(certificateThunks.createCertificate.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(certificateThunks.createCertificate.fulfilled, (state, action) => {
            state.certificates.push(action.payload.data)
            state.loading = false
            toast.success("Thêm chứng chỉ thành công")
        })
        builder.addCase(certificateThunks.createCertificate.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false
            toast.error(action.payload.errorMessage)
        })

        //update certificate
        builder.addCase(certificateThunks.updateCertificate.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(certificateThunks.updateCertificate.fulfilled, (state, action) => {
            state.certificates = state.certificates?.map(
                (cert) => (cert.id === action.payload.data.id ? action.payload.data : cert)
            )
            state.loading = false;
            toast.success("Cập nhật chứng chỉ thành công")
        })
        builder.addCase(certificateThunks.updateCertificate.rejected, (state, action:PayloadAction<any>) => {
            state.loading = false;
            toast.error(action.payload.errorMessage)
        })

         //delete
        builder.addCase(certificateThunks.deleteCertificate.pending, (state) => {
            state.isSubmitting = true;
        })
        builder.addCase(certificateThunks.deleteCertificate.fulfilled, (state, action) => {
            state.certificates = state.certificates.filter(cert => cert.id !== action.meta.arg)
            state.isSubmitting = false;
            toast.success("Xóa chứng chỉ thành công")
        })
        builder.addCase(certificateThunks.deleteCertificate.rejected, (state, action:PayloadAction<any>) => {
            state.isSubmitting = false;
            toast.error(action.payload.errorMessage)
        })


    }
});

export const certificateActions = {
    ...certificateSlice.actions,
    ...certificateThunks,
}

export default certificateSlice.reducer;