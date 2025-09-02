import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';
import { updateAdminProfile } from '../../services/adminService';

const AdminProfilePage: React.FC = () => {
  const { admin, setAdmin } = useAuth();
  const [formData, setFormData] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
    phoneNumber: admin?.phoneNumber || '',
    location: admin?.location || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updatedAdmin = await updateAdminProfile(formData);
      setAdmin(updatedAdmin); // Update auth context state
      toast.success("Profile updated successfully!");
    } catch(error) {
      toast.error(error instanceof Error ? error.message : "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <img src={admin?.avatar || `https://i.pravatar.cc/150?u=${admin?._id}`} alt={admin?.name} className="h-32 w-32 rounded-full mx-auto object-cover" />
                    </CardHeader>
                    <CardContent className="text-center">
                        <h2 className="text-xl font-bold">{admin?.name}</h2>
                        <p className="text-sm text-gray-500 capitalize">{admin?.role.replace('_', ' ')}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-2">
                <Card>
                    <CardHeader><CardTitle>Profile Information</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                        <Input label="Email Address" name="email" value={formData.email} onChange={handleChange} disabled />
                        <Input label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                        <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
                        <div className="pt-2">
                            <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Changes'}</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProfilePage;
