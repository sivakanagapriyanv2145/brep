import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { Admin } from '../types';
import { listAdmins, updateAdmin, deleteAdmin } from '../../services/adminService';
import toast from 'react-hot-toast';

const AdminManagementPage: React.FC = () => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAdmins = useCallback(async () => {
        setLoading(true);
        try {
            const data = await listAdmins();
            setAdmins(data);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to load admins.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAdmins();
    }, [fetchAdmins]);

    const handleToggleActive = async (id: string, currentStatus: boolean) => {
        try {
            await updateAdmin(id, { isActive: !currentStatus });
            toast.success("Admin status updated.");
            fetchAdmins(); // Refresh data
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to update status.");
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this admin? This action cannot be undone.")) {
            try {
                await deleteAdmin(id);
                toast.success("Admin deleted successfully.");
                fetchAdmins(); // Refresh data
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Failed to delete admin.");
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Admin Management</h1>
                <Button>Add New Admin</Button>
            </div>

            <Card>
                <CardHeader><CardTitle>All Administrators</CardTitle></CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-12"><Spinner /></div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Role</th>
                                        <th scope="col" className="px-6 py-3">Status</th>
                                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins.map(admin => (
                                        <tr key={admin._id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                                                <img src={admin.avatar || `https://i.pravatar.cc/150?u=${admin._id}`} alt={admin.name} className="h-8 w-8 rounded-full"/>
                                                {admin.name}
                                            </td>
                                            <td className="px-6 py-4">{admin.email}</td>
                                            <td className="px-6 py-4 capitalize">{admin.role.replace('_', ' ')}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    admin.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {admin.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button onClick={() => handleToggleActive(admin._id, admin.isActive)} className="font-medium text-admin-accent hover:underline">
                                                    {admin.isActive ? 'Deactivate' : 'Activate'}
                                                </button>
                                                <button onClick={() => handleDelete(admin._id)} className="font-medium text-red-600 hover:underline">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminManagementPage;
