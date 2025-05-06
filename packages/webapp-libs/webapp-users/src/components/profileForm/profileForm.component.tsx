import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useProfile } from '../../hooks/useProfile';
import { UserProfileUpdateData } from '../../types';

// Validation schema for profile form
const profileSchema = yup.object().shape({
  firstName: yup.string().nullable(),
  lastName: yup.string().nullable(),
  bio: yup.string().nullable().max(500, 'Bio must be at most 500 characters'),
  location: yup.string().nullable(),
  phoneNumber: yup.string().nullable(),
  jobTitle: yup.string().nullable(),
  company: yup.string().nullable(),
  website: yup.string().nullable().url('Website must be a valid URL'),
  socialLinks: yup.object().shape({
    twitter: yup.string().nullable().url('Twitter link must be a valid URL'),
    linkedin: yup.string().nullable().url('LinkedIn link must be a valid URL'),
    github: yup.string().nullable().url('GitHub link must be a valid URL'),
    facebook: yup.string().nullable().url('Facebook link must be a valid URL'),
  }),
});

interface ProfileFormProps {
  /** 
   * Called when profile update is successful
   */
  onSuccess?: () => void;
}

/**
 * Form component for editing user profile information
 */
export const ProfileForm = ({ onSuccess }: ProfileFormProps) => {
  const toast = useToast();
  const { profile, updateProfile, isUpdating } = useProfile();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProfileUpdateData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: profile?.user.firstName || '',
      lastName: profile?.user.lastName || '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      phoneNumber: profile?.phoneNumber || '',
      jobTitle: profile?.jobTitle || '',
      company: profile?.company || '',
      website: profile?.website || '',
      socialLinks: {
        twitter: profile?.socialLinks?.twitter || '',
        linkedin: profile?.socialLinks?.linkedin || '',
        github: profile?.socialLinks?.github || '',
        facebook: profile?.socialLinks?.facebook || '',
      },
    },
  });

  // Reset form when profile data changes
  React.useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.user.firstName || '',
        lastName: profile.user.lastName || '',
        bio: profile.bio || '',
        location: profile.location || '',
        phoneNumber: profile.phoneNumber || '',
        jobTitle: profile.jobTitle || '',
        company: profile.company || '',
        website: profile.website || '',
        socialLinks: {
          twitter: profile.socialLinks?.twitter || '',
          linkedin: profile.socialLinks?.linkedin || '',
          github: profile.socialLinks?.github || '',
          facebook: profile.socialLinks?.facebook || '',
        },
      });
    }
  }, [profile, reset]);

  // Handle form submission
  const onSubmit = async (data: UserProfileUpdateData) => {
    try {
      await updateProfile(data);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: 'Failed to update profile',
        description: 'There was an error updating your profile. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <VStack spacing={6} align="stretch">
        <Heading size="md">Personal Information</Heading>
        
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <FormControl isInvalid={!!errors.firstName}>
            <FormLabel>First Name</FormLabel>
            <Input {...register('firstName')} />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!errors.lastName}>
            <FormLabel>Last Name</FormLabel>
            <Input {...register('lastName')} />
            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
        
        <FormControl isInvalid={!!errors.bio}>
          <FormLabel>Bio</FormLabel>
          <Textarea {...register('bio')} rows={4} />
          <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
        </FormControl>
        
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <FormControl isInvalid={!!errors.location}>
            <FormLabel>Location</FormLabel>
            <Input {...register('location')} />
            <FormErrorMessage>{errors.location?.message}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!errors.phoneNumber}>
            <FormLabel>Phone Number</FormLabel>
            <Input {...register('phoneNumber')} />
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
        
        <Heading size="md" mt={4}>Professional Information</Heading>
        
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <FormControl isInvalid={!!errors.jobTitle}>
            <FormLabel>Job Title</FormLabel>
            <Input {...register('jobTitle')} />
            <FormErrorMessage>{errors.jobTitle?.message}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!errors.company}>
            <FormLabel>Company</FormLabel>
            <Input {...register('company')} />
            <FormErrorMessage>{errors.company?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
        
        <FormControl isInvalid={!!errors.website}>
          <FormLabel>Website</FormLabel>
          <Input {...register('website')} placeholder="https://" />
          <FormErrorMessage>{errors.website?.message}</FormErrorMessage>
        </FormControl>
        
        <Heading size="md" mt={4}>Social Links</Heading>
        
        <FormControl isInvalid={!!errors.socialLinks?.twitter}>
          <FormLabel>Twitter</FormLabel>
          <Input {...register('socialLinks.twitter')} placeholder="https://twitter.com/username" />
          <FormErrorMessage>{errors.socialLinks?.twitter?.message}</FormErrorMessage>
        </FormControl>
        
        <FormControl isInvalid={!!errors.socialLinks?.linkedin}>
          <FormLabel>LinkedIn</FormLabel>
          <Input {...register('socialLinks.linkedin')} placeholder="https://linkedin.com/in/username" />
          <FormErrorMessage>{errors.socialLinks?.linkedin?.message}</FormErrorMessage>
        </FormControl>
        
        <FormControl isInvalid={!!errors.socialLinks?.github}>
          <FormLabel>GitHub</FormLabel>
          <Input {...register('socialLinks.github')} placeholder="https://github.com/username" />
          <FormErrorMessage>{errors.socialLinks?.github?.message}</FormErrorMessage>
        </FormControl>
        
        <FormControl isInvalid={!!errors.socialLinks?.facebook}>
          <FormLabel>Facebook</FormLabel>
          <Input {...register('socialLinks.facebook')} placeholder="https://facebook.com/username" />
          <FormErrorMessage>{errors.socialLinks?.facebook?.message}</FormErrorMessage>
        </FormControl>
        
        <Flex justify="flex-end" mt={4}>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isUpdating}
            loadingText="Saving..."
          >
            Save Changes
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};